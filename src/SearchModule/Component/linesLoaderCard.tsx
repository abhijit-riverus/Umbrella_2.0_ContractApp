import React from 'react';
import LinesLoader from '../../UniversalComponents/Loader/linesLoader';

export default function LinesLoaderCard() {
    return (
        <>
            <div className="mt-2">
                <div className="row">
                    <div className="col-md-12 my-2 p-3 searchdetails-card">
                        <div className="row">
                            <LinesLoader animatedLines={[{ width: 30, height: 20 }, { width: 20, height: 8 }, { width: 20, height: 8 },
                            { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <div className="row">
                    <div className="col-md-12 my-2 p-3 searchdetails-card">
                        <div className="row">
                            <LinesLoader animatedLines={[{ width: 30, height: 20 }, { width: 20, height: 8 }, { width: 20, height: 8 },
                            { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <div className="row">
                    <div className="col-md-12 my-2 p-3 searchdetails-card">
                        <div className="row">
                            <LinesLoader animatedLines={[{ width: 30, height: 20 }, { width: 20, height: 8 }, { width: 20, height: 8 },
                            { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <div className="row">
                    <div className="col-md-12 my-2 p-3 searchdetails-card">
                        <div className="row">
                            <LinesLoader animatedLines={[{ width: 30, height: 20 }, { width: 20, height: 8 }, { width: 20, height: 8 },
                            { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}