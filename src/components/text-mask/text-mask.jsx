import * as React from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, textMask, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={textMask}
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// const NumericFormatCustom = React.forwardRef(
//   function NumericFormatCustom(props, ref) {
//     const { onChange, ...other } = props;

//     return (
//       <NumericFormat
//         {...other}
//         getInputRef={ref}
//         onValueChange={(values) => {
//           onChange({
//             target: {
//               name: props.name,
//               value: values.value,
//             },
//           });
//         }}
//         thousandSeparator
//         valueIsNumericString
//         prefix="$"
//       />
//     );
//   },
// );

// NumericFormatCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

export default function FormattedInputs({
  handleInput,
  name,
  value,
  textMask,
  error,
  label
}) {
  //   const [values, setValues] = React.useState({
  //     textmask: "",
  //     numberformat: "1320",
  //   });

  //   const handleChange = (event) => {
  //     setValues({
  //       ...values,
  //       [event.target.name]: event.target.value,
  //     });
  //   };

  return (
    <Stack direction="column" spacing={2}>
      {/* <FormControl variant="outlined">
        <InputLabel htmlFor="formatted-text-mask-input">react-imask</InputLabel>
        <Input
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        />
      </FormControl> */}
      <FormControl error={error}>

      <TextField
        label={label}
        value={value}
        fullWidth
        onChange={handleInput}
        name={name}
        required
        id="formatted-text-mask-input"
        InputProps={{
          inputComponent: TextMaskCustom,
          inputProps: {
              textMask: textMask,
          },
        }}
        variant="outlined"
        />
      {error && (
          <FormHelperText
          sx={{ mt: "0 !important" }}
          >{`${error}*`}</FormHelperText>
        )}
        </FormControl>
    </Stack>
  );
}
