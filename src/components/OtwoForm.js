import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Slider from "@material-ui/core/Slider";
import InputAdornment from "@material-ui/core/InputAdornment";

const validationSchema = yup.object({
  expMinVol: yup
    .number("Ange expMinVol")
    .min(0)
    .required("ExpMinVol är obligatoriskt"),
  fiO2: yup.number("Ange fiO2").required("FiO2 är obligatoriskt"),
});

const OtwoForm = ({ callback, clear }) => {
  const formik = useFormik({
    initialValues: {
      expMinVol: 0,
      fiO2: 22,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      callback({ ...values });
    },
  });

  const marks = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 25,
      label: "25%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Input
            fullWidth
            id="expMinVol"
            name="expMinVol"
            label="ExpMinVol"
            type="number"
            value={formik.values.expMinVol}
            onChange={formik.handleChange}
            error={formik.touched.expMinVol && Boolean(formik.errors.expMinVol)}
            endAdornment={<InputAdornment position="end">Liter</InputAdornment>}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Slider
            defaultValue={21}
            getAriaValueText={(value) => {
              return `${value}%`;
            }}
            aria-labelledby="discrete-slider-always"
            onChange={(e, value) => formik.setFieldValue("fiO2", value)}
            step={1}
            marks={marks}
            valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              clear();
              formik.resetForm();
            }}
          >
            Rensa
          </Button>
        </Grid>
        <Grid item xs={6} md={6}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Beräkna
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OtwoForm;
