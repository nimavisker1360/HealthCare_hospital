import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp fallbackRedirectUrl="/admin/dashboard" />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 right-0 w-full"
      >
        <path
          fill="#16423c"
          fillOpacity="1"
          d="M0,96L34.3,117.3C68.6,139,137,181,206,208C274.3,235,343,245,411,213.3C480,181,549,107,617,85.3C685.7,64,754,96,823,117.3C891.4,139,960,149,1029,181.3C1097.1,213,1166,267,1234,240C1302.9,213,1371,107,1406,53.3L1440,0L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
