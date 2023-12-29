import { useCallback } from 'react';
import { useVerifyMutation } from '../store';

const useVerify: () => () => void = () => {
    const [verify, verifyResult] = useVerifyMutation();

    const verifyToken = useCallback((): void => {
        const accessTokenExpireDate = parseInt(
            document.cookie.match(`(^|;)\\s*accessTokenExpiresAt\\s*=\\s*([^;]+)`)?.pop() || ''
        );

        if (accessTokenExpireDate) {
            verify();
        }
    }, [verify]);

    return verifyToken;
};

export { useVerify };
