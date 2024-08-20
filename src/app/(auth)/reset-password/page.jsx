"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { InputField } from "@/components";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import ApiManager from "@/helper/api-manager";
import { handleLoader, setToast } from "@/store/reducer";
import errorsSetter from "@/helper/error-setter";

const ResetPassword = () => {
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();
    const router = useRouter();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        dispatch(handleLoader(true));
        e.preventDefault();
        try {
            let { data } = await ApiManager("post", "auths/reset-password", formData);
            localStorage.removeItem("Email");
            localStorage.removeItem("otp");
            router.push("/login");
            dispatch(setToast({type: "success" , message : data?.message }))
        } catch (error) {
            setFormErrors(errorsSetter(error));
        } finally {
            dispatch(handleLoader(false));
        }
    };
    useEffect(() => {
        let email = localStorage.getItem("Email");
        let otpCode = localStorage.getItem("otp");
        if (email && otpCode) {
            setFormData((prev) => ({
                ...prev,
                email: email,
                otpCode: otpCode,
            }));
        }
    }, []);
    return (
        <Box width="100%" component="form" onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Stack gap={1}>
                    <Typography sx={{ fontWeight: "bold" }} variant="h5">
                        Reset Your Password
                    </Typography>
                    <Typography color="#8f8f8f" variant="body2">
                        Enter your new password
                    </Typography>
                </Stack>
                <Stack gap={2}>
                    <InputField
                        placeholder="Enter New Password"
                        label="Enter New Password"
                        type="password"
                        name="password"
                        value={formData?.password}
                        onChange={handleInputChange}
                    />
                    <InputField
                        placeholder="Re-Enter New Password"
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        error={formErrors?.confirmPassword}
                        value={formData?.confirmPassword}
                        onChange={handleInputChange}
                    />
                </Stack>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ borderRadius: 1, mt: 1.5 }}
                    size="large"
                >
                    Reset Password
                </Button>
            </Stack>
        </Box>
    );
};

export default ResetPassword;
