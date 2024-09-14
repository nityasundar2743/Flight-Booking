import {FlightBook} from "../../components/FlightBook";

export default function ({ params }: { params: { flightId: string } }) {
    console.log("flightId is ",params.flightId)
    return (
        <div>
            <FlightBook flightId={params.flightId}/>
        </div>
    )
}