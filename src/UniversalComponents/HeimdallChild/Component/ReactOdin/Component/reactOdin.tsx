import React from 'react';

interface Props {
    children: any;
    claims: string[];
    allegiance: string;
    fallBack: any;
}

export default function ReactOdin(props: Props) {
    let { children, claims, allegiance, fallBack } = props;
    if (claims.indexOf(allegiance) > -1) {
        return (
            <>
                {children}
            </>
        );
    } else {
        return (
            <>
                {fallBack}
            </>
        );
    }

}