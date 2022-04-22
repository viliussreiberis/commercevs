import React from "react";
import { TextField, Grid } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { useForm, FormProvider } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useForm();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        as={TextField}
        control={control}
        fullWidth
        name={name}
        label={label}
        required={required}
      />
      test
    </Grid>
  );
};

export default FormInput;
