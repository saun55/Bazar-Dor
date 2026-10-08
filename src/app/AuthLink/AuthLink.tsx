"use client"

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { ReactNode } from "react";
import { MarqueeType } from "../DataType/MarqueeType";

const AuthLink = ({children,card}:{children:ReactNode,
  card:MarqueeType
}) => {
  const {data:session} = useSession()

  const href = session?.user?`/CategoriesDetails/${card.id}`
    : "/authentication/signIn";
  return (
<Link href={href}>{children}</Link>
  );
};

export default AuthLink;