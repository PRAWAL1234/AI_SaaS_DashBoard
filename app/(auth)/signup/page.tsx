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
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../Routes/routes";
import { useMutation } from "@tanstack/react-query";
import useLogin from "@/app/services/auth";

type signupProps = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
};

export default function SignupPage() {
  const { message } = App.useApp();
  const router = useRouter();
  const [form] = Form.useForm<signupProps>();
  const { signUp } = useLogin();
  const signupMutation = useMutation({
    mutationKey: ["SIGNUP"],
    mutationFn: async (payload: signupProps) => {
      return await signUp(payload);
    },
    onSuccess(data, variables, context) {
      router.push(ROUTES.LOGIN);
      form.resetFields();
      message.success("Account created successfully!");
    },
    onError(error: any) {
      message.error(
        error?.response?.data?.detail || "Failed to create account",
      );
    },
  });
  const onFinish = async () => {
    const value = await form.validateFields();
    await signupMutation.mutateAsync(value);
  };

  return (
    <Flex className="h-lvh w-lvw bg-gray-200 flex flex-col gap-5 justify-center items-center">
      <Card className="w-xl flex justify-center items-center">
        <Typography.Title className="text-center font-normal text-2xl ">
          Create Account
        </Typography.Title>
        <Typography.Paragraph className="text-center text-gray-500">
          Join Resume AI to optimize your career path.
        </Typography.Paragraph>

        <Form
          className="w-lg"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined style={{ color: "#9CA3AF" }} />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined style={{ color: "#9CA3AF" }} />}
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: "#9CA3AF" }} />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined style={{ color: "#9CA3AF" }} />}
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item
            name="agreeTerms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must agree to the terms")),
              },
            ]}
          >
            <Checkbox>
              I agree to the{" "}
              <Link href="/terms" style={{ color: "#4F46E5" }}>
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" style={{ color: "#4F46E5" }}>
                Privacy Policy
              </Link>
            </Checkbox>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={signupMutation.isPending}
            disabled={signupMutation.isPending}
          >
            Create Account
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
            Already have an account?{" "}
            <Link
              href={ROUTES.LOGIN}
              style={{ color: "#4F46E5", fontWeight: 500 }}
            >
              Log in
            </Link>
          </p>
        </Form>
      </Card>
      <div className=" flex gap-4">
        <Link href={"/"}>Privacy Policy</Link>
        <Link href={"/"}>Term of service</Link>
        <Link href={"/"}>Contact support</Link>
      </div>
    </Flex>
  );
}
