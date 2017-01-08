interface JQuery {
    datepicker: any
}

// Order list

interface OrderListContainerProps {}
interface OrderListContainerState {
    orders: any[],
    users?: any,
    pages?: number,
    pageSelected?: number
}

interface OrderListProps {}
interface OrderListState {}