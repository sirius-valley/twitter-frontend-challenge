import type { ChangeEvent } from "react";
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthWrapper from "../../../pages/auth/AuthWrapper";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import LabeledInput from "../../../components/labeled-input/LabeledInput";
import Button from "../../../components/button/Button";
import { ButtonType } from "../../../components/button/StyledButton";
import { StyledH3 } from "../../../components/common/text";
import * as Yup from "yup";
import {ErrorMessage, Form, Formik} from "formik";

interface SignUpData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpPage = () => {
  const [data, setData] = useState<Partial<SignUpData>>({});
  const [error, setError] = useState<string>();

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t("validation.required", { field: t("input-params.name") }))
      .min(3, t("validation.min", { field: t("input-params.name"), min: 3 })),
    username: Yup.string()
      .required(t("validation.required", { field: t("input-params.username") })),
    email: Yup.string()
      .required(t("validation.required", { field: t("input-params.email") }))
      .email(t("validation.email")),
    password: Yup.string()
      .required(t("validation.required", { field: t("input-params.password") }))
      .min(8, t("validation.min", { field: t("input-params.password"), min: 8 }))
      .matches(/[A-Z]/, t("validation.uppercaseRequired", { field: t("input-params.password") }))
      .matches(/[0-9]/, t("validation.numberRequired", { field: t("input-params.password") }))
      .matches(/[@$!%*?&.]/, t("validation.specialCharacterRequired", { field: t("input-params.password") })),
    confirmPassword: Yup.string()
      .required(t("validation.required", { field: t("input-params.confirm-password") }))
      .oneOf([Yup.ref("password")], t("validation.passwordsMatch")),
  });

  const handleChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [prop]: event.target.value });
    };
  const handleSubmit = (values: SignUpData, { setSubmitting, setErrors }: any) => {
    const { confirmPassword, ...signUpData } = values;
    httpRequestService
      .signUp(signUpData)
      .then(() => navigate("/"))
      .catch((e) => {
        setError(e.message)
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt="Twitter Logo" />
            <StyledH3>{t("title.register")}</StyledH3>
          </div>
          <Formik
            initialValues={{ name: '', username: '', email: '', password: '', confirmPassword: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="input-container" style={{alignItems: "center"}}>
              <div className="input-field">
                <LabeledInput
                  type="text"
                  name="name"
                  placeholder={"Enter name..."}
                  classname="input"
                  required
                  title="Name"
                />
                <ErrorMessage name="name" component="div" className="error-message"/>
              </div>
              <div className="input-field">
                <LabeledInput
                  type="text"
                  name="username"
                  placeholder={"Enter user..."}
                  classname="input"
                  required
                  title="Username"
                />
                <ErrorMessage name="username" component="div" className="error-message"/>
              </div>
              <div className="input-field">
                <LabeledInput
                  title={t("input-params.email")}
                  type="text"
                  name="email"
                  placeholder={"Enter email..."}
                  classname="input"
                  required
                />
                <ErrorMessage name="email" component="div" className="error-message"/>
              </div>
              <div className="input-field">
                <LabeledInput
                  title={t("input-params.password")}
                  type="password"
                  name="password"
                  placeholder={"Enter password..."}
                  classname="input"
                  required
                />
                <ErrorMessage name="password" component="div" className="error-message"/>
              </div>
              <div className="input-field">
                <LabeledInput
                  title={t("input-params.confirm-password")}
                  type="password"
                  name="confirmPassword"
                  placeholder={"Confirm password..."}
                  classname="input"
                  required
                />
                <ErrorMessage name="confirmPassword" component="div" className="error-message"/>
              </div>
              {/*<LabeledInput*/}
              {/*  required*/}
              {/*  placeholder={"Enter name..."}*/}
              {/*  title={t("input-params.name")}*/}
              {/*  error={error}*/}
              {/*  onChange={handleChange("name")}*/}
              {/*/>*/}
              {/*<LabeledInput*/}
              {/*  required*/}
              {/*  placeholder={"Enter username..."}*/}
              {/*  title={t("input-params.username")}*/}
              {/*  error={error}*/}
              {/*  onChange={handleChange("username")}*/}
              {/*/>*/}
              {/*<LabeledInput*/}
              {/*  required*/}
              {/*  placeholder={"Enter email..."}*/}
              {/*  title={t("input-params.email")}*/}
              {/*  error={error}*/}
              {/*  onChange={handleChange("email")}*/}
              {/*/>*/}
              {/*<LabeledInput*/}
              {/*  type="password"*/}
              {/*  required*/}
              {/*  placeholder={"Enter password..."}*/}
              {/*  title={t("input-params.password")}*/}
              {/*  error={error}*/}
              {/*  onChange={handleChange("password")}*/}
              {/*/>*/}
              {/*<LabeledInput*/}
              {/*  type="password"*/}
              {/*  required*/}
              {/*  placeholder={"Confirm password..."}*/}
              {/*  title={t("input-params.confirm-password")}*/}
              {/*  error={error}*/}
              {/*  onChange={handleChange("confirmPassword")}*/}
              {/*/>*/}
              <span className={"error-message"}>{error}</span>
              <div style={{display: "flex", flexDirection: "column"}}>
                <Button
                  text={t("buttons.register")}
                  buttonType={ButtonType.FOLLOW}
                  size={"MEDIUM"}
                  type="submit"
                />
                <Button
                  text={t("buttons.login")}
                  buttonType={ButtonType.OUTLINED}
                  size={"MEDIUM"}
                  onClick={() => navigate("/sign-in")}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
