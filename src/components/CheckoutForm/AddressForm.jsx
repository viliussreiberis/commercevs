import React, { useState, useEffect, useRef } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";

import FormInput from "./CustomTextField";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const address1Ref = useRef();
  const cityRef = useRef();
  const zipRef = useRef();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);

    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(checkoutToken, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  const methods = useForm();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Adress
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            next({
              firstName: firstNameRef.current.value,
              lastName: lastNameRef.current.value,
              email: emailRef.current.value,
              address1: address1Ref.current.value,
              city: cityRef.current.value,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            });
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            <Grid
              item
              xs={9}
              sm={6}
              // sx={{
              //   display: "flex",
              //   flexDirection: "column",
              //   justifyContent: "center",
              // }}
            >
              <TextField
                id="outlined-basic"
                label="firstName"
                variant="outlined"
                sx={{ m: 4 }}
                required
                inputRef={firstNameRef}
              />

              <TextField
                id="outlined-basic"
                label="lastName"
                variant="outlined"
                sx={{ m: 4 }}
                inputRef={lastNameRef}
              />
              <TextField
                id="outlined-basic"
                label="adress"
                variant="outlined"
                sx={{ m: 4 }}
                inputRef={address1Ref}
              />
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                sx={{ m: 4 }}
                inputRef={emailRef}
              />
              <TextField
                id="outlined-basic"
                label="city"
                variant="outlined"
                sx={{ m: 4 }}
                inputRef={cityRef}
              />
              <TextField
                id="outlined-basic"
                label="ZIP /Postal Code"
                variant="outlined"
                sx={{ m: 4 }}
                inputRef={zipRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={4}>
                <Box>
                  {" "}
                  <InputLabel>Shipping Country</InputLabel>
                  <Select
                    value={shippingCountry}
                    fullWidth
                    onChange={(e) => setShippingCountry(e.target.value)}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  {" "}
                  <InputLabel sx={{ mt: "2" }}>Shipping SubDivision</InputLabel>
                  <Select
                    value={shippingSubdivision}
                    fullWidth
                    onChange={(e) => setShippingSubdivision(e.target.value)}
                  >
                    {subdivisions.map((subdivision) => (
                      <MenuItem key={subdivision.id} value={subdivision.id}>
                        {subdivision.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <InputLabel>Shipping Options</InputLabel>
                  <Select
                    value={shippingOption}
                    fullWidth
                    onChange={(e) => setShippingOption(e.target.value)}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <br />
          <div>
            <Button
              component={Link}
              to="/cart"
              variant="outlined"
              sx={{ mr: 3 }}
            >
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
