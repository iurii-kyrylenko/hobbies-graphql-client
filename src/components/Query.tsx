import { DocumentNode, OperationVariables, useQuery } from "@apollo/client";

interface IProps {
    query: DocumentNode;
    variables?: OperationVariables;
}

export default function Query({ query, variables }: IProps) {
    const { loading, error, data } = useQuery(query, { variables });
    return (
            <pre>
                {JSON.stringify({ loading, error, data }, null, 2)}
            </pre>
    );
}
