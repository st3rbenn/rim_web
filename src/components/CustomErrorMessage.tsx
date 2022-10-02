import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {FormikErrors, FormikTouched} from 'formik';
import {User} from 'src/models/user';

interface CustomErrorMessage {
  assingTo: string;
  errors: FormikErrors<User>;
  touched: FormikTouched<User>;
}

function CustomErrorMessage(props: CustomErrorMessage) {
  const {assingTo, errors, touched} = props;

  const error = errors[assingTo as keyof User] && touched[assingTo as keyof User];

  const errMessage = errors[assingTo as keyof User] as string;

  return <>{error && <Text style={styles.errorMsg}>{errMessage}</Text>}</>;
}

export default CustomErrorMessage;

const styles = StyleSheet.create({
  errorMsg: {
    color: 'red',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
