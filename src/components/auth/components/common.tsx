import {
  Row,
  Typography,
  theme,
} from "antd";
import {
  titleStyles
} from "./styles";
import NextImage from "next/image";


interface Props {
  children?: React.ReactNode | string
}


export const PageTitle = (props: Props) => {
  const { children } = props
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "32px",
        fontSize: "20px",
      }}
    >
      {children ?? (
        <Row justify="center" gutter={12} style={{
          gap: 10
        }}>
          <NextImage src="/logo.svg" alt="logo" width="40" height="40" />
          <Typography.Title level={3} style={{
            padding: 0,
            margin: 0,
            lineHeight: "36px"
          }}>Dashboard</Typography.Title>
        </Row>
      )}
    </div>
  )
}


export const CardTitle = (props: Props) => {
  const { children } = props
  const { token } = theme.useToken();

  return (
    <Typography.Title
      level={4}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {children}
    </Typography.Title>
  )
}
