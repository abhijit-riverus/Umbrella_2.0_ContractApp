import React from 'react';

interface Props {
    loading: boolean;
    percent: string;
    success: boolean;
}

export default function RiverusLoader (props: Props){
    let { loading, percent, success} = props;
    let stroke ;
   if(percent === '25%'){
        stroke = "25,100"
    }else if(percent === '50%'){
        stroke = "50,100"
    }else if(percent === '75%'){
        stroke = "75,100";
    }else if(percent === '100%'){
        stroke = "100,100"
    }else{
        stroke = "0,100"
    }
    
        return(
            <div className="default-loader">
                <div className="wrapper" id="riverus-loader">
                <div id="signup_loader" className={loading ? 'spinner pie' : 'spinner'}></div>
                        <div className="single-chart">
                            <svg viewBox="0 0 36 36" className="circular-chart" id={success ? "stroke-success" :"stroke-failure"}>
                            <path className="riverus-loader" style={{strokeWidth: "1.8"}}
                                strokeDasharray={ stroke }
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            </svg>
                            <div className="riverus-logo">

                            </div>
                        </div> 
                </div>
              
            </div>
        )
}