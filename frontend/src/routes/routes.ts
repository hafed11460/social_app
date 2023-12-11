import { DashRoute } from "types/types.routes";



const dashRoutes:DashRoute[] = [
    {
        label: 'Dashboard',
        to: '/',
        labelDisable: true,
        icon: 'bi bi-grid-fill',
        children: [
            {
                name: 'All Switchs',
                to: '/switches',
                exact: true,
                active: true
            },
        ]
    },
    {
        label: 'Employees',
        to: '/employees',
        labelDisable: true,
        icon: 'bi bi-router-fill',
        children: [
            {
                name: 'All Switchs',
                to: '/switchs',
                exact: true,
                active: true
            },
            {
                name: 'Create',
                to: '/switches/create',
                exact: true,
                active: true
            },
        ]
    },
    {
        label: 'Devices',
        to: '/devices',
        labelDisable: false,
        icon: 'bi bi-stack',
        children: [
            {
                name: 'Desktop',
                to: '/devices/desktop/',
                icon: 'bi bi-pc-display-horizontal',
                exact: true,
                active: true
            },
            {
                name: 'Printer',
                icon: 'bi bi-printer',
                to: '/devices/printer',
                exact: true,
                active: true
            },
        ]
    },
    {
        label: 'Tools',
        to: '/tools',
        labelDisable: false,
        icon: 'bi bi-tools',
        children: [
            {
                name: 'Tools',
                to: '/tools/',
                icon: 'bi bi-layer-backward',
                exact: true,
                active: true
            },
            {
                name: 'Backup',
                to: '/tools/backup/',
                icon: 'bi bi-layer-backward',
                exact: true,
                active: true
            },
            {
                name: 'NetScan',
                to: '/tools/netscan',
                icon: 'bi bi-upc-scan',
                exact: true,
                active: true
            },
        ]
    }
]

export default dashRoutes;