import { faCalendarAlt, faCog, faNoteSticky, faStar, faSun, faTasks, type IconDefinition } from "@fortawesome/free-solid-svg-icons";

type sidebarItemsInfoType = {
    icon: IconDefinition,
    iconColor?: string,
    name: string,
    linkAddress?: string,
    disable?: boolean
}

export const sidebarItemsInfo: sidebarItemsInfoType[] = [
    {
        icon: faSun,
        name: 'my day',
        linkAddress: '/admin/my_day'
    },
    {
        icon: faStar,
        name: 'important',
        linkAddress: '/admin/important_tasks',
    },
    {
        icon: faCalendarAlt,
        iconColor: "rgb(200, 10, 57)",
        name: 'planned',
        linkAddress: '',
        disable: true
    },
    {
        icon: faNoteSticky,
        iconColor: "rgb(91, 246, 77)",
        name: 'notes',
        linkAddress: '',
        disable: true
    },
    {
        icon: faTasks,
        name: 'checked',
        linkAddress: '/admin/checked_tasks',
    },
    {
        icon: faCog,
        name: 'setting',
        linkAddress: '',
        disable: true
    },
]