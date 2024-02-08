import ClientTopBar from "@/components/ClientTopBar";
import Link from "next/link";
import NavCard from "@/components/NavCard";
import { PERMISSION_CODES } from "@/lib/permissions-code";
// import TopBar from "@/components/Topbar";
import { checkUserPermission } from "@/lib/session-manager";
import { getPermissions } from "@/lib/server";
import { getServerSession } from "next-auth/next";
import { getTranslator } from "next-intl/server";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function CustomerDashboard () {
  const t = await getTranslator("en", "dashboard");
  const session = await getServerSession(options);
  const permissions = await getPermissions(session);

  if (!permissions.length) {
    return (
      <main className="w-screen h-screen flex flex-col items-center p-5 bg-[url('/background.svg')] bg-cover bg-no-repeat md:bg-repeat">
        {t("no_auth")} <br/>
        <Link href="/" className="bg-blue text-white py-1 px-3">
          {t("login")}
        </Link>
      </main>
    );
  }


    return (
      <main className="w-screen h-screen flex flex-col justify-start bg-[url('/background.svg')] bg-cover bg-repeat  md:bg-repeat">
        <ClientTopBar/>
        <div className="text-lg font-semibold text-gray2 animate-[bounce_2s_ease-in-out] bg-transwhite shadow-lg rounded-lg p-5 m-2 w-[20%] md:w-[40%] sm:w-full">
        Welcome <span className="text-blue font-bold">{session?.user.name}</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 bg-transwhite gap-4   shadow-lg rounded-lg mx-[10%] px-[5%] ">
          <div className=" transition-transform duration-300 hover:scale-105">
            <NavCard title={t("my_quotations")} image="/sourcing_icon.svg" link="/sourcing" />
          </div>
          <div className=" transition-transform duration-300 hover:scale-105">

            <NavCard title={t("my_orders")} image="/sales-icon.svg" link="/orders"/>
          </div>
          <div className=" transition-transform duration-300 hover:scale-105">
            <NavCard title={t("my_invoices")} image="/invoice-icon.svg" link="/invoices"/>
          </div>
          <div className=" transition-transform duration-300 hover:scale-105">
            <NavCard title={t("items")} image="/purchase-icon.svg" link="/items"/>
          </div>
        </div>
      </main>
    );

  // return (
  //   <main className="w-screen h-screen flex flex-col justify-start bg-[url('/background.svg')] bg-cover bg-repeat  md:bg-repeat">
  //     {/* <TopBar/> */}
  //     <div className="text-lg font-semibold text-gray2 animate-[bounce_2s_ease-in-out] bg-transwhite shadow-lg rounded-lg p-5 m-2 w-[20%] md:w-[40%] sm:w-full">
  // Welcome <span className="text-blue font-bold">{session?.user.name}</span>
  //     </div>

  //     <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 bg-transwhite gap-4   shadow-lg rounded-lg mx-[10%] px-[5%] ">
  //       {await checkUserPermission(PERMISSION_CODES.READ_CLIENT) || await checkUserPermission(PERMISSION_CODES.CREATE_CLIENT) ||
  //       await checkUserPermission(PERMISSION_CODES.DELETE_CLIENT) || await checkUserPermission(PERMISSION_CODES.UPDATE_CLIENT)
  //         ? (
  //           <div className=" transition-transform duration-300 active:scale-105">
  //             <NavCard title={t("client")} image="/client-icon.svg" link="/clients"/>
  //           </div>
  //         )
  //         : ("")}
  //       {await checkUserPermission(PERMISSION_CODES.CREATE_QUOTATION) || await checkUserPermission(PERMISSION_CODES.UPDATE_ASSIGNED_QUOTATION) ||
  //       await checkUserPermission(PERMISSION_CODES.READ_QUOTATION) || await checkUserPermission(PERMISSION_CODES.DELETE_QUOTATION) || await checkUserPermission(PERMISSION_CODES.UPDATE_QUOTATION) ||
  //       await checkUserPermission(PERMISSION_CODES.READ_ASSIGNED_QUOTATION)
  //         ? (
  //           <div className=" transition-transform duration-300 active:scale-105" data-cy="quotation-page">
  //             <NavCard title={t("sourcing")} image="/sourcing_icon.svg" link="/sourcing"/>
  //           </div>
  //         )
  //         : ("")}
  //       {(await checkUserPermission(PERMISSION_CODES.CREATE_ORDER) || await checkUserPermission(PERMISSION_CODES.READ_ORDER) ||
  //       await checkUserPermission(PERMISSION_CODES.UPDATE_ORDER) || await checkUserPermission(PERMISSION_CODES.DELETE_ORDER) || await checkUserPermission(PERMISSION_CODES.UPDATE_ASSIGNED_ORDER)) ||
  //       await checkUserPermission(PERMISSION_CODES.READ_ASSIGNED_ORDER)
  //         ? (
  //           <div className=" transition-transform duration-300 active:scale-105" data-cy="sales-order-page">
  //             <NavCard title={t("sales_order")} image="/sales-icon.svg" link="/orders"/>
  //           </div>
  //         )
  //         : ("")}
  //       {await checkUserPermission(PERMISSION_CODES.CREATE_INVOICE) || await checkUserPermission(PERMISSION_CODES.READ_INVOICE) ||
  //       await checkUserPermission(PERMISSION_CODES.UPDATE_INVOICE) || await checkUserPermission(PERMISSION_CODES.DELETE_INVOICE) || await checkUserPermission(PERMISSION_CODES.UPDATE_ASSIGNED_INVOICE) ||
  //       await checkUserPermission(PERMISSION_CODES.READ_ASSIGNED_INVOICE)
  //         ? (
  //           <div className=" transition-transform duration-300 active:scale-105">
  //             <NavCard title={t("invoice")} image="/invoice-icon.svg" link="/invoices"/>

  //           </div>
  //         )
  //         : ("")}
  //       {await checkUserPermission(PERMISSION_CODES.CREATE_PURCHASER) || await checkUserPermission(PERMISSION_CODES.UPDATE_PURCHASER) ||
  //       await checkUserPermission(PERMISSION_CODES.READ_PURCHASER) || await checkUserPermission(PERMISSION_CODES.DELETE_PURCHASER) ||
  //       await checkUserPermission(PERMISSION_CODES.PLACE_ORDER_PURCHASER)
  //         ? (
  //           <div className=" transition-transform duration-300 active:scale-105">
  //             <NavCard title={t("purchase")} image="/purchase-icon.svg" link="/purchases"/>
  //           </div>
  //         )
  //         : ("")}
  //       {await checkUserPermission(PERMISSION_CODES.TRACK_ORDER) || await checkUserPermission(PERMISSION_CODES.READ_TRACKING) ||
  //       await checkUserPermission(PERMISSION_CODES.UPDATE_TRACKING) || await checkUserPermission(PERMISSION_CODES.DELETE_TRACKING)
  //         ? (
  //           <div className=" transition-transform duration-300 active:scale-105">
  //             <NavCard title={t("tracking")} image="/track-icon.svg" link="/tracking"/>
  //           </div>
  //         )
  //         : ("")}
  //       {await checkUserPermission(PERMISSION_CODES.CREATE_WAREHOUSE) || await checkUserPermission(PERMISSION_CODES.READ_WAREHOUSE)
  //         ? (
  //           <div className=" transition-transform duration-300 active:scale-105">
  //             <NavCard title={t("warehouse")} image="/warehouse-icon.svg" link="/warehouse"/>
  //           </div>
  //         )
  //         : ("")}
  //       {await checkUserPermission(PERMISSION_CODES.READ_INTERNAL_ORDER) || await checkUserPermission(PERMISSION_CODES.UPDATE_ASSIGNED_INTERNAL_ORDER) ||
  //       await checkUserPermission(PERMISSION_CODES.UPDATE_INTERNAL_ORDER) || await checkUserPermission(PERMISSION_CODES.DELETE_INTERNAL_ORDER)
  //         ? (
  //           <div className=" transition-transform duration-300 active:scale-105">
  //             <NavCard title={t("internal_orders")} image="/invoice-icon.svg" link="/tracking"/>
  //           </div>
  //         )
  //         : ("")}
  //       {await checkUserPermission(PERMISSION_CODES.CREATE_USER) || await checkUserPermission(PERMISSION_CODES.READ_USER) ||
  //       await checkUserPermission(PERMISSION_CODES.UPDATE_USER) || await checkUserPermission(PERMISSION_CODES.DELETE_USER)
  //         ? (
  //           <div className=" transition-transform duration-300 active:scale-105" data-cy="users-page">
  //             <NavCard title={t("user_management")} image="/management-icon.svg" link="/users"/>
  //           </div>
  //         )
  //         : ("")}
  //     </div>
  //   </main>
  // );
}
