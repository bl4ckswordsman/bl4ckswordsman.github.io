import React from 'react';
import {useRouter} from 'next/router';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage
} from "@/components/ui/breadcrumb";

const CustomBreadcrumb: React.FC = () => {
    const router = useRouter();
    const pathnames = router.pathname.split('/').filter(x => x);

    return (
        <div className="m-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathnames.length > 0 && <BreadcrumbSeparator/>}
                    {pathnames.map((value, index) => {
                        const isLast = index === pathnames.length - 1;
                        const href = `/${pathnames.slice(0, index + 1).join('/')}`;

                        return isLast ? (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbPage>{value}</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={href}>{value}</BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < pathnames.length - 1 && <BreadcrumbSeparator/>}
                            </React.Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default CustomBreadcrumb;