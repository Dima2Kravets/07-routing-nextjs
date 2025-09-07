import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

const App = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { page: pageParam, search: searchParam } = await searchParams;

  const tagParam = slug?.[0] || "";
  const tag = tagParam === "All" ? undefined : tagParam;
  const page = Number(pageParam) || 1;
  const search = searchParam || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, search, tag }],
    queryFn: () => fetchNotes(page, search, 12, "created", tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag}/>
    </HydrationBoundary>
  );
};

export default App;