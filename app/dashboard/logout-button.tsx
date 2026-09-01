"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
      }}
      className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
      ออกจากระบบ
    </button>
  );
}
