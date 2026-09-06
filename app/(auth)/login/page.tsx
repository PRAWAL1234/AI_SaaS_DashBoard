"use client";

import {
  App,
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  Card,
  Flex,
  Typography,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../Routes/routes";
import useLogin from "@/app/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../store/userStore";
type loginProps = {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
};

export default function LoginPage() {
  const { message } = App.useApp();
  const router = useRouter();
  const [form] = Form.useForm<loginProps>();
  const { login } = useLogin();
  const setUserData = useUserStore((state: any) => state.setUserData);

  const loginMutation = useMutation({
    mutationKey: ["Login"],
    mutationFn: async (payload: loginProps) => {
      return await login(payload);
    },
    onSuccess(data) {
      document.cookie = `auth_token=${data?.access_token}; path=/; max-age=86400`;
      if (data?.user_data) {
        setUserData(
          data?.user_data?.id,
          data?.user_data?.username,
          data?.user_data?.email,
        );
      }
      router.push(ROUTES.DASHBOARD);
      form.resetFields();
      message.success("Login successful!");
    },
    onError(error: any) {
      message.error(
        error?.response?.data?.detail ||
          "Invalid email or password. Please try again.",
      );
    },
  });

  const onFinish = async () => {
    const value = await form.validateFields();
    await loginMutation.mutateAsync(value);
  };

  return (
    <Flex className="h-lvh w-lvw bg-gray-200 flex flex-col gap-5 justify-center items-center">
      <Card className="w-xl flex justify-center items-center">
        <Typography.Title className="text-center font-normal text-2xl">
          Welcome Back
        </Typography.Title>
        <Typography.Paragraph className="text-center text-gray-500">
          Log in to your Resume AI account.
        </Typography.Paragraph>

        <Form
          className="w-lg"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="emailOrUsername"
            rules={[
              {
                required: true,
                message: "Please enter your email or username",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined style={{ color: "#9CA3AF" }} />}
              placeholder="Email or Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              // { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: "#9CA3AF" }} />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link
                href="/forgot-password"
                style={{ color: "#4F46E5", fontSize: 14 }}
              >
                Forgot password?
              </Link>
            </div>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            Log In
          </Button>

          <Divider plain style={{ color: "#9CA3AF", fontSize: 13 }}>
            or continue with
          </Divider>

          <div style={{ display: "flex", gap: 12 }}>
            <Button size="large" icon={<GoogleOutlined />} block>
              Google
            </Button>
            <Button size="large" icon={<LinkedinOutlined />} block>
              LinkedIn
            </Button>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: 24,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href={ROUTES.SIGNUP}
              style={{ color: "#4F46E5", fontWeight: 500 }}
            >
              Sign up
            </Link>
          </p>
        </Form>
      </Card>

      <div className="flex gap-4">
        <Link href={"/"}>Privacy Policy</Link>
        <Link href={"/"}>Terms of Service</Link>
        <Link href={"/"}>Contact Support</Link>
      </div>
    </Flex>
  );
}
