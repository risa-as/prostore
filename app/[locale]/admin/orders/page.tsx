import { auth } from "@/auth";
import Pagination from "@/components/shared/pagination";
import { deleteOrder, getAllOrders } from "@/lib/actions/order.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { Metadata } from "next";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/shared/delete-dialog";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Admin Orders",
};
const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  await requireAdmin();
  const { page = "1", query: searchText } = await props.searchParams;
  const session = await auth();
  if (session?.user?.role !== "admin")
    throw new Error("User Is Not Authorized");
  const orders = await getAllOrders({
    page: Number(page),
    limit: 5,
    query: searchText,
  });

  const t = await getTranslations('Admin');

  return (
    <div className="space-y-2">
      <div className="flex items-center  gap-3">
        <h1 className="h2-bold">{t('orders')}</h1>
        {searchText && (
          <div>
            {t('filteredBy')} <i>&quot;{searchText}&quot;</i>{" "}
            <Link href="/admin/orders">
              <Button variant={"outline"} size="sm">
                {t('removeFilter')}
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('id')}</TableHead>
              <TableHead>{t('date')}</TableHead>
              <TableHead>{t('name')}</TableHead>
              <TableHead className="text-end">{t('total')}</TableHead>
              <TableHead>{t('paid')}</TableHead>
              <TableHead>{t('delivered')}</TableHead>
              <TableHead className="w-[100px]">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order: any) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>{order.user.name}</TableCell>

                <TableCell className="text-end">{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : t('notPaid')}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : t('notDelivered')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/order/${order.id}`}>{t('details')}</Link>
                    </Button>
                    <DeleteDialog id={order.id} action={deleteOrder} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders.totalPages}
            urlParamName="page"
          />
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
