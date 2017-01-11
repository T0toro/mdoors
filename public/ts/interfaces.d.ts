interface JQuery {
    datepicker: any
}

// Order list

interface OrderListContainerProps {}
interface OrderListContainerState {
    orders: any[],
    users?: any,
    pages?: number,
    access?: string,
    pageSelected?: number
}

interface OrderListProps {}
interface OrderListState {}

// Ozp list

interface OzpListContainerProps {
    ozpFetch: any
}
interface OzpListContainerState {
    ozps: any[],
    ozpsShifts: any[]
}

interface OzpListProps {
    store: any
}
interface OzpListState {}

interface OzpTotalProps {}
interface OzpTotalState {}


// Odds list

interface OddsListContainerProps {}

interface OddsListContainerState {
    orders: any[],
    users?: any,
    pages?: number,
    pageSelected?: number
}

interface OddsListProps {}
interface OddsListState {}

// Buttons

interface IRemoveButtonProps {
    url: string
}
