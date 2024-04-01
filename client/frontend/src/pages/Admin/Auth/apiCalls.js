import axios from "axios";
import swal from 'sweetalert';



export const loginCall = async (userCredential, dispatch) => {

    dispatch({ type: "LOGIN_START" });


    try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/auth/login`, userCredential);

        console.log('err res', res)

        if (res.status !== 200) {

            if (res.data?.error?.message) {
                swal(res.data.error.message, "error");

            } else if (res?.data?.message) {
                swal(res.data.message, "error");

            }

        }

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });


    } catch (err) {

        dispatch({ type: "LOGIN_FAILURE", payload: err });

    }

}

export const verifyToken = async (accessToken, dispatch) => {

    try {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/auth/info`,
            {
                headers: {
                    "Authorization": `Bearer ` + accessToken,
                }
            }
        );

        console.log("token is verified");

        // swal("Successfully logout", "success");

        return true;

    } catch (err) {

        // swal("Not authtorized to access admin", "error");


        console.log("token is not verified", err);

        dispatch({ type: "LOGIN_OUT" });

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");


        return false;

    }
}

export const loginOut = async (accessToken, dispatch) => {

    try {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/auth/logout`,
            {
                headers: {
                    "Authorization": `Bearer ` + accessToken,
                }
            }
        );

        dispatch({ type: "LOGIN_OUT" });

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        swal("Successfully logout", "success");

        return true;

        // navigate("/admin/login");


    } catch (err) {
        swal("You are not authorized to logout!", "error");

        return false;

        // dispatch({ type: "LOGIN_FAILURE", payload: err });

    }

}