import ShareCurrentPageButton from "@/components/shared/ShareCurrentPageButton";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QRCode from "react-qr-code";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isValidUpiId } from "@/utils/upi";
import { BorderBeam } from "@/components/ui/border-beam";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { upiId } = await searchParams;

  if (typeof upiId !== "string") {
    return {
      title: "Invalid URL",
    };
  }

  if (!isValidUpiId(upiId))
    return {
      title: "Invalid UPI ID",
    };

  return {
    title: `UPI Payment Interface | ${upiId}`,
    openGraph: {
      images: ["/icons/BhimUPI.svg"],
    },
  };
}

const page = async ({ searchParams }: Props) => {
  const { upiId, amount } = await searchParams;

  if (typeof upiId !== "string") {
    return null;
  }
  console.log(isValidUpiId("john.doe@googlepay"));

  if (!isValidUpiId(upiId)) {
    return <div>Invalid URL</div>;
  }

  let upiUrl = `upi://pay?pa=${upiId}&pn=Merchant`;
  if (amount) {
    upiUrl += `&am=${amount}&cu=INR`;
  }

  return (
    <div className="container max-w-md mx-auto p-4">
      <Card className="w-full overflow-hidden relative ">
        <CardHeader className="bg-red-400">
          <CardTitle className="text-2xl font-bold text-center">
            You are paying {amount && `₹${amount}`} to {upiId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-auto w-full bg-white p-6 sm:p-10 rounded-lg border mx-auto mt-7 shadow-2xl dark:shadow-[0_25px_50px_-12px_rgba(256,256,256,0.25)] text-black">
            <QRCode value={upiUrl} className="h-auto max-w-full w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-center w-full">
            <Link href={upiUrl} target="_blank">
              <Button variant="secondary" className="w-full">
                Pay Now
              </Button>
            </Link>
          </div>
        </CardFooter>
        <BorderBeam size={250} duration={12} delay={9} />
      </Card>
      <div className="pt-4">
        <div className="text-center">
          <p>Pay with any UPI App.</p>
          <p>UPI ID: {upiId}</p>
          <div className="flex justify-center items-center gap-2 pt-1">
            <Image
              src="/icons/PhonePe.svg"
              alt="PhonePe Logo"
              width={30}
              height={30}
            />
            <Image
              src="/icons/GooglePay.svg"
              alt="PhonePe Logo"
              width={30}
              height={30}
            />
            <Image
              src="/icons/Paytm.svg"
              alt="PhonePe Logo"
              width={30}
              height={30}
            />
            <Image
              src="/icons/BhimUPI.svg"
              alt="PhonePe Logo"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="text-center pt-4">
          <ShareCurrentPageButton />
        </div>
      </div>
    </div>
  );
};

export default page;
