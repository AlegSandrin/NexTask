import { Skeleton } from "@mui/material"

export const SkeletonLoading = () => {
    return <>
        <div className="flex flex-col w-full h-full items-start gap-3">
            <Skeleton variant="rounded" width={"60%"} height={30} sx={{ alignSelf: "center", marginBottom: "15px" }}/>
            <Skeleton variant="rounded" width={"40%"} height={40} sx={{ marginBottom: "10px" }} />
            <Skeleton variant="rounded" width={"100%"} height={50} />
            <Skeleton variant="rounded" width={"100%"} height={50} />
            <Skeleton variant="rounded" width={"40%"} height={40} sx={{ marginBottom: "10px" }} />
            <Skeleton variant="rounded" width={"100%"} height={50} />
            <Skeleton variant="rounded" width={"100%"} height={50} />
        </div>
    </>
}