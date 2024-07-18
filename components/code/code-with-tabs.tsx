import { Pre, RawCode, highlight } from "codehike/code"
import { Block, CodeBlock, parseProps } from "codehike/blocks"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import theme from "@/theme.mjs"
import { CodeIcon } from "../annotations/icons"
import { Code, HighCode, extractFlags, getHandlers } from "@/components/code"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

const Schema = Block.extend({ tabs: z.array(CodeBlock) })

export async function CodeWithTabs(props: unknown) {
  const { tabs } = parseProps(props, Schema)
  return (
    // <div
    //   className="w-full px-3 py-2 border-b border-editorGroup-border bg-editorGroupHeader-tabsBackground text-sm text-tab-activeForeground flex"
    //   style={{ borderColor: "var(--border-color)" }}
    // >
    <div>
      <CodeTabs tabs={tabs} />
    </div>
  )
}

export async function CodeTabs(props: { tabs: RawCode[] }) {
  const { tabs } = props
  const highlighted = await Promise.all(
    tabs.map((tab) => highlight(tab, theme)),
  )
  return (
    <Tabs defaultValue={tabs[0]?.meta} className="w-full">
      <TabsList className="w-full h-full border border-editorGroup-border bg-editorGroupHeader-tabsBackground text-sm flex rounded-none rounded-t">
        {tabs.map((tab, i) => {
          const { title, flags } = extractFlags(highlighted[i])

          return (
            <TabsTrigger
              key={tab.meta}
              value={tab.meta}
              className={cn(
                "text-tab-activeForeground text-sm flex items-center gap-3 rounded-none font-normal h-full data-[state=active]:underline px-3 py-2",
                i === 0 && "rounded-tl",
              )}
            >
              <CodeIcon title={title} />
              {title}
            </TabsTrigger>
          )
        })}
      </TabsList>
      {tabs.map((tab, i) => {
        const { title, flags } = extractFlags(highlighted[i])
        const newFlags = highlighted[i].meta.replace(title, "").trim() // remove `title` from `meta`

        const highlighedWithoutTitle = {
          ...highlighted[i],
          meta: newFlags, // don't want title here b/c title is already displayed in the TabsTrigger
        }

        return (
          <TabsContent key={tab.meta} value={tab.meta} className="mt-0">
            {/* <HighCode
              highlighted={highlighedWithoutTitle}
              className="m-0 rounded-none rounded-b border-t-0"
            /> */}
            <div
              className="border border-editorGroup-border border-t-0 rounded rounded-t-none overflow-hidden mb-2 relative"
              style={
                {
                  "--border-color": "var(--ch-23)",
                  borderColor: "var(--border-color)",
                } as any
              }
            >
              {flags.includes("c") && (
                <CopyButton
                  text={highlighted[i].code}
                  className="absolute right-4 my-0 top-2"
                />
              )}
              <Pre
                code={highlighted[i]}
                className="m-0 py-2 px-0 bg-editor-background rounded-none group flex-1 selection:bg-editor-selectionBackground"
                handlers={getHandlers(flags)}
                style={{
                  backgroundColor: "var(--bg-color)",
                }}
              />
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
