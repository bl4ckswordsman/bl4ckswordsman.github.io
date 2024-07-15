import React from 'react';
import {Chip} from "@nextui-org/react";
import {FaCircleCheck, FaCircleXmark} from "react-icons/fa6";

interface StatusChipProps {
    status: 'success' | 'danger';
    content: string;
}

const StatusChip: React.FC<StatusChipProps> = ({status, content}) => {
    const color = status === 'success' ? 'success' : 'danger';
    const Icon = status === 'success' ? FaCircleCheck : FaCircleXmark;

    return (
        <Chip color={color} startContent={<Icon/>} variant={"faded"}>
            {content}
        </Chip>
    );
};

export default StatusChip;
