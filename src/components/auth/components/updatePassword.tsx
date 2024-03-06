import React from "react";
import {
  UpdatePasswordPageProps,
  UpdatePasswordFormTypes,
  useActiveAuthProvider,
  useTranslate,
  useUpdatePassword,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/antd";
import {
  layoutStyles,
  containerStyles,
  titleStyles,
  headStyles,
  bodyStyles,
} from "./styles";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  LayoutProps,
  CardProps,
  FormProps,
  theme,
} from "antd";
import { PageTitle, CardTitle } from "./common";


type UpdatePasswordProps = UpdatePasswordPageProps<
  LayoutProps,
  CardProps,
  FormProps
>;

/**
 * **refine** has update password page form which is served on `/update-password` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#update-password} for more details.
 */
export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<UpdatePasswordFormTypes>();
  const translate = useTranslate();
  const authProvider = useActiveAuthProvider();
  const { mutate: updatePassword, isLoading } =
    useUpdatePassword<UpdatePasswordFormTypes>({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });


  const CardContent = (
    <Card
      title={
        <CardTitle>
          {translate("pages.updatePassword.title", "Set New Password")}
        </CardTitle>
      }
      styles={{
        header: headStyles,
        body: bodyStyles
      }}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      <Form<UpdatePasswordFormTypes>
        layout="vertical"
        form={form}
        onFinish={(values) => updatePassword(values)}
        requiredMark={false}
        {...formProps}
      >
        <Form.Item
          name="password"
          label={translate(
            "pages.updatePassword.fields.password",
            "New Password",
          )}
          rules={[{ required: true }]}
          style={{ marginBottom: "12px" }}
        >
          <Input type="password" placeholder="●●●●●●●●" size="large" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label={translate(
            "pages.updatePassword.fields.confirmPassword",
            "Confirm New Password",
          )}
          hasFeedback
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    translate(
                      "pages.updatePassword.errors.confirmPasswordNotMatch",
                      "Passwords do not match",
                    ),
                  ),
                );
              },
            }),
          ]}
        >
          <Input type="password" placeholder="●●●●●●●●" size="large" />
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            block
          >
            {translate("pages.updatePassword.buttons.submit", "Update")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align="middle"
        style={{
          padding: "16px 0",
          minHeight: "100dvh",
        }}
      >
        <Col xs={22}>
          {renderContent ? (
            renderContent(CardContent, <PageTitle>{title}</PageTitle>)
          ) : (
            <>
              <PageTitle>{title}</PageTitle>
              {CardContent}
            </>
          )}
        </Col>
      </Row>
    </Layout>
  );
};
