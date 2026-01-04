import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";
import LoadingIcon from "../../../../../../components/loadingIcon/LoadingIcon";
import styles from "./HeaderDate.module.scss";

// region HeaderDate()
export default function HeaderDate() {
  const headerDateGetQuery = useQuery({
    queryKey: ["headerDate"],
    queryFn: async () => {
      const data = await fetch(
        "http://localhost:8080/php/task_manager/getDate.php"
      );

      if (!data.ok) {
        throw new Error(data.statusText);
      }

      const response = await data.text();
      return new Date(response).toLocaleString("en-US", {
        day: "numeric",
        weekday: "long",
        month: "long",
      });
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    if (headerDateGetQuery.error) {
      toast.error(headerDateGetQuery.error.message);
    }
  }, [headerDateGetQuery.error]);

  // region return
  return (
    <div className={styles.date}>
      {headerDateGetQuery.isPending ? (
        <LoadingIcon width={24} loadingText={false} />
      ) : (
        headerDateGetQuery.data
      )}
    </div>
  );
}
