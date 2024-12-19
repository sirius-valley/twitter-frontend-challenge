import React from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHttpRequestService } from "../../../service/HttpRequestService";
import AuthWrapper from "../AuthWrapper";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ButtonType } from "../../../components/button/StyledButton";
import Button from "../../../components/button/Button";
import {StyledH3} from "../../../components/common/text";
import LabeledInput from "../../../components/labeled-input/LabeledInput";

interface SignInFormValues {
  username: string;
  password: string;
}

const SignInPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const httpRequestService = useHttpRequestService();

  const [error, setError] = React.useState<string | null>(null);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t("validation.required", { field: t("input-params.username") })),
    password: Yup.string()
      .required(t("validation.required", { field: t("input-params.password") })),
  });


  const handleSubmit = (values: SignInFormValues, { setSubmitting, setErrors }: any) => {
    httpRequestService
      .signIn(values)
      .then(() => navigate("/"))
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <AuthWrapper>
      <div className={"border"}>
        <div className={"container"}>
          <div className={"header"}>
            <img src={logo} alt={"Twitter Logo"} />
            <StyledH3>{t("title.login")}</StyledH3>
          </div>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="input-container" style={{alignItems: "center"}}>
                <div className="input-field">
                  <LabeledInput
                    type="text"
                    name="username"
                    placeholder={"Enter user..."}
                    classname="input"
                    required
                    title="Username"
                  />
                  <ErrorMessage name="username" component="div" className="error-message" />
                </div>

                <div className="input-field">
                  <LabeledInput
                    title="Password"
                    type="password"
                    name="password"
                    placeholder={"Enter password..."}
                    classname="input"
                    required
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                {error && (<span className="error-message">{t("error.login")}</span>)}

                <div className="input-field" style={{width: "fit-content", display: "flex", flexDirection: "column"}}>
                  <Button
                    text={t("buttons.login")}
                    buttonType={ButtonType.FOLLOW}
                    size={"MEDIUM"}
                    type="submit"
                  />
                  <Button
                    text={t("buttons.register")}
                    buttonType={ButtonType.OUTLINED}
                    size={"MEDIUM"}
                    onClick={() => navigate("/sign-up")}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignInPage;
