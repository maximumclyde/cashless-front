import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsTriggerProps, TabsProps } from "@radix-ui/react-tabs";

type Props = TabsProps & {
  tabList: TabsTriggerProps[];
};

export function TabNavigationComponent(props: Props) {
  const { tabList, ...rest } = props;

  return (
    <Tabs {...rest}>
      <TabsList
        className={"grid w-full "}
        style={{
          gridTemplateColumns: `repeat(${
            tabList?.length || 1
          }, minmax(0, 1fr))`,
        }}
      >
        {tabList?.length
          ? tabList.map((tab, i) => {
              return (
                <TabsTrigger key={i} {...tab}>
                  {tab.children}
                </TabsTrigger>
              );
            })
          : null}
      </TabsList>
    </Tabs>
  );
}
