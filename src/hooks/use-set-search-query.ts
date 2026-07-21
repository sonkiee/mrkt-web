import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSetSearchQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (key: string, value: string) => {
    const sp = new URLSearchParams(searchParams.toString());

    //    if (!value) sp.delete(key);

    sp.set(key, value);
    const newUrl = `${pathname}?${sp.toString()}`;
    router.push(newUrl);
  };
}

// ("use client");

// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// export function useSetSearchQuery() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const commit = (sp: URLSearchParams) => {
//     const qs = sp.toString();
//     router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
//   };

//   const setMany = (patch: Record<string, string>) => {
//     const sp = new URLSearchParams(searchParams.toString());
//     for (const [k, v] of Object.entries(patch)) sp.set(k, v);
//     commit(sp);
//   };

//   const setOne = (key: string, value: string) => {
//     setMany({ [key]: value });
//   };

//   return { setOne, setMany };
// }
