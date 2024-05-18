import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { openSnackbar } from "../store/app-slice";
import SettingsForm, { SettingsData, SubmitData } from "../components/SettingsForm";
import { useEffect } from "react";
import { GET_USER, UPDATE_USER } from "../queries/users";

interface QueryData {
    user: SettingsData;
}

interface QueryVars {
    id: string;
}

const Settings = () => {
    const userId = useSelector((state: RootState) => state.userId);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const { data } = useQuery<QueryData, QueryVars>(GET_USER, {
        variables: { id: userId },
        fetchPolicy:  "network-only", // to have recent data
    });

    const [updateUser, { data: updateResult, error }] = useMutation(UPDATE_USER);

    useEffect(() => {
        if (error) {
            dispatch(openSnackbar({ message: error.message, severity: "error" })); 
        }
        if (updateResult) {
            navigate("/");
            dispatch(openSnackbar({ message: "Settings updated!", severity: "success" })); 
        }
    }, [updateResult, error]);

    const handleSubmit = (submitData: SubmitData) => {
        updateUser({
            variables: { id: userId, settings: submitData },
            onError(error) {
                dispatch(openSnackbar({ message: error.message, severity: "error" }));
            },
        });
    };

    return (
        <SettingsForm data={data?.user} onSubmit={handleSubmit} />
    );
};

export default Settings;