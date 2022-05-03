import React from 'react';
import LinesLoader from '../../Loader/linesLoader';

export default function SentenceLoader() {
    return (
        <>
            <div className="mt-2">
                <div className="row">
                    <div className="col-md-12 my-2">
                        <div className="row">
                            <LinesLoader animatedLines={[{ width: 50, height: 20 }, { width: 20, height: 8 }, { width: 20, height: 8 },
                            { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <LinesLoader animatedLines={[{ width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 },
                        { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <LinesLoader animatedLines={[{ width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 },
                        { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <LinesLoader animatedLines={[{ width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 },
                        { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <LinesLoader animatedLines={[{ width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 },
                        { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <LinesLoader animatedLines={[{ width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 },
                            { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }, { width: 100, height: 8 }]} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}