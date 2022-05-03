import React from 'react';

interface Props {
    component: any;
}

export default function ComponenWrapper(props: Props) {
    let { component } = props;
    return (
       <>
        {component}
       </>
    );
}