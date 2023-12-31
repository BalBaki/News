import { useEffect } from 'react';
import { useVerifyMutation } from '../store';

const useVerify = () => {
    const [verify, verifyResult] = useVerifyMutation();
    const accessTokenExpireDate = parseInt(
        document.cookie.match(`(^|;)\\s*accessTokenExpiresAt\\s*=\\s*([^;]+)`)?.pop() || ''
    );

    useEffect(() => {
        accessTokenExpireDate && verify();
    }, [verify]);

    return { isLoading: verifyResult.isLoading || (accessTokenExpireDate && verifyResult.isUninitialized) };
};

export { useVerify };
