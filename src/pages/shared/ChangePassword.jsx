import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { changePassword as changePasswordService } from '../../services/passwordService';


function ChangePassword({ role }) {


    const navigate = useNavigate();
    const [values, setValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (values.newPassword !== values.confirmPassword) {
            toast.error("New password and confirm password do not match!");
            return
        }

        setLoading(true);
        try {
            const payload = {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            };
            const response = await changePasswordService(payload, role)


            toast.success(response.data.message || "Password changed successfully!");
            setValues({ oldPassword: "", newPassword: "", confirmPassword: "" });

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to change password";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage:
                    "url(https://www.lawnpop.com/wp-content/uploads/2024/03/shutterstock_2025816362.jpg)",
            }}
        >
            <div className="hero-overlay bg-green-900 bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content w-full flex flex-col items-center justify-center px-4">
                <div className="mb-8 max-w-2xl">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                        Change Password - <span className="text-lime-300">{role}</span>
                    </h2>
                    <p className="text-white text-base md:text-lg">
                        Please enter your current password and choose a new one.
                    </p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md">
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        <input
                            type="password"
                            placeholder="Current Password"
                            name="oldPassword"
                            className="input input-bordered w-full bg-white/90 text-black placeholder-gray-500"
                            value={values.oldPassword}
                            onChange={(e) =>
                                setValues({ ...values, oldPassword: e.target.value })
                            }
                            required
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            name="newPassword"
                            className="input input-bordered w-full bg-white/90 text-black placeholder-gray-500"
                            value={values.newPassword}
                            onChange={(e) =>
                                setValues({ ...values, newPassword: e.target.value })
                            }
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            name="confirmPassword"
                            className="input input-bordered w-full bg-white/90 text-black placeholder-gray-500"
                            value={values.confirmPassword}
                            onChange={(e) =>
                                setValues({ ...values, confirmPassword: e.target.value })
                            }
                            required
                        />
                        <button
                            type="submit"
                            className="btn bg-lime-400 hover:bg-lime-500 border-none text-black font-bold mt-4"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Change Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default ChangePassword
