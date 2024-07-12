import { highlight } from "codehike/code"
import { Block, CodeBlock, parseProps } from "codehike/blocks"
import { z } from "zod"
import theme from "@/theme.mjs"
import { HighCode } from "./code"

export async function CodeWithTooltips(props: unknown) {
  const {
    code,
    tooltips = [],
  } = parseProps(
    props,
    Block.extend({ code: CodeBlock, tooltips: z.array(Block).optional() }),
  )

  const highlighted = await highlight(code, theme)
  highlighted.annotations = highlighted.annotations.map((a) => {
    const note = tooltips.find((n) => n.title === a.query)
    if (!note) return a
    return {
      ...a,
      data: {
        ...a.data,
        children: note.children,
      },
    }
  })

  return <HighCode highlighted={highlighted} />
}
