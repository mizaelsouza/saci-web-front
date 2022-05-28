import React from "react";
import { Formik } from "formik";
export default function FormsCadastrados({ children, props }) {
    return <Formik {...props}>{children}</Formik>;
}
