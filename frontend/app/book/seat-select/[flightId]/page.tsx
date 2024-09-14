import {SeatSelect} from "../../../components/SeatSelect";

export default function ({ params }: { params: { flightId: string } }) {
    return (
        <div>
            <SeatSelect flightId={params.flightId}/>
        </div>
    )
}