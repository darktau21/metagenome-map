import dynamic from "next/dynamic";

export const Map = dynamic(() => import("./ui/map"), { ssr: false });
