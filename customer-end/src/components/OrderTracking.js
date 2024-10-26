import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderTracking = ({ status, dates }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    const stages = [
        { name: 'Ordered', icon: 'bi-clipboard-check', date: formatDate(dates['pending']) },
        { name: 'Packed', icon: 'bi-box', date: formatDate(dates['processing']) },
        { name: 'In Transit', icon: 'bi-truck', date: formatDate(dates['ontheway']) },
        { name: 'Delivered', icon: 'bi-house', date: formatDate(dates['received']) },
    ];

    const getStatusClass = (stageName) => {
        const statusIndex = stages.findIndex((stage) => stage.name === status);
        const stageIndex = stages.findIndex((stage) => stage.name === stageName);
        return stageIndex <= statusIndex ? 'text-success' : 'text-muted';
    };

    return (
        <div className="d-flex flex-row gap-4">
            {stages.map((stage, index) => (
                <div key={index} className="d-flex flex-column align-items-center">
                    <div className={`mb-2 fs-3 ${getStatusClass(stage.name)}`}>
                        <i className={`bi ${stage.icon}`}></i>
                    </div>
                    <div className="text-center">
                        <span className={`fw-bold ${getStatusClass(stage.name)}`}>
                            {stage.name}
                        </span>
                        <br />
                        <small className="text-muted">
                            {stage.date || 'Pending'}
                        </small>
                    </div>
                    {index < stages.length - 1 && (
                        <div
                            className={`border-top ${getStatusClass(stage.name)}`}
                            style={{ width: '40px', height: '2px' }}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OrderTracking;
