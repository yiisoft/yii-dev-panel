import { Breadcrumbs, Link, Typography } from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { Outlet } from "react-router";
import { BreadcrumbsContext } from "@yiisoft/yii-dev-panel/Module/Inspector/Context/BreadcrumbsContext";

export const Layout = () => {
    const context = useContext(BreadcrumbsContext);
    const linkableBreadcrumbs = context.items.slice(0, -1);
    const lastBreadcrumb = context.items.at(-1);

    return (
        <>
            <Breadcrumbs sx={{my: 2}}>
                <Link underline="hover" color="inherit" href="/inspector/git">
                    Git
                </Link>
                {linkableBreadcrumbs.length > 0 &&
                    linkableBreadcrumbs.map((item, index) => (
                        <Link key={index} underline="hover" color="inherit" href={item.href}>
                            {item.title}
                        </Link>
                    ))}
                {lastBreadcrumb && <Typography color="text.primary">{lastBreadcrumb.title}</Typography>}
            </Breadcrumbs>
            <Outlet />
        </>
    );
};
