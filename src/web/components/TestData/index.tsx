import React, { Suspense } from "react";
import { useFetch } from '@brightleaf/react-hooks'
const TestFetch = () => {
    const { data, error, loading } = useFetch(
        `/api/data`
    )
    if (error) {
        return (
            <div className="error">
                <h1>Error Getting Data</h1>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="loading">
                <h1>Loading Data</h1>
            </div>
        )
    }
    return (
        <div className="success">
            <h1>{data.data}</h1>
        </div>
    )
}
const TestData = () => {

    return (
        <Suspense fallback={<span>Loading...</span>}>
            <TestFetch />
        </Suspense>
    )
};
export default TestData;