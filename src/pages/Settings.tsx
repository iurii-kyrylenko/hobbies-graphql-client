import { useDispatch, useSelector } from "react-redux";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { openSnackbar } from "../store/app-slice";
import SettingsForm, { SettingsData, SubmitData } from "../components/SettingsForm";
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

    const handleError = (error: ApolloError) =>
        dispatch(openSnackbar({ message: error.message, severity: "error" }));

    const handleSuccess = () => {
        navigate("/");
        dispatch(openSnackbar({ message: "Settings updated!", severity: "success" }));
    };

    const { data } = useQuery<QueryData, QueryVars>(GET_USER, {
        variables: { id: userId },
        onError: handleError,
        fetchPolicy:  "network-only", // to have recent data
    });

    const [updateUser] = useMutation(UPDATE_USER);

    const handleSubmit = (submitData: SubmitData) => {
        updateUser({
            variables: { id: userId, settings: submitData },
            onError: handleError,
            onCompleted: handleSuccess,
        });
    };

    return (
        <SettingsForm data={data?.user} onSubmit={handleSubmit} />
    );
};

export default Settings;