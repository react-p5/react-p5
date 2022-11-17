import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  forwardRef,
  HStack,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { UIProps } from "types"

const UI = forwardRef<UIProps, "div">(({ values, noLoop, title }, ref) => {
  const loop = () => {
    if (typeof window !== "undefined" && noLoop) {
      window.p5?.loop()
      window.p5?.noLoop()
    }
  }

  return (
    <Accordion
      ref={ref}
      position="absolute"
      maxW="max-content"
      mt={6}
      ml={6}
      p={3}
      bg="white"
      borderRadius={8}
      borderWidth={1}
      borderColor="gray.200"
      boxShadow="md"
      allowToggle
      transition="opacity 200ms ease-out"
    >
      <AccordionItem border="none">
        <AccordionButton>
          <Box flex={1} textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <VStack align="stretch" spacing={6}>
            {values?.map((v, i) => {
              const { label, value, setValue, max } = v

              return (
                <VStack key={i} align="flex-start">
                  <HStack>
                    <Text whiteSpace="nowrap">{label}:</Text>
                    <Input
                      type="number"
                      value={value}
                      onChange={e => {
                        setValue(parseInt(e.target.value))
                        loop()
                      }}
                      maxW={`${Math.floor(value.toString().length * 2)}ch`}
                      p={0}
                      textAlign="center"
                    />
                  </HStack>
                  <Slider
                    colorScheme="red"
                    focusThumbOnChange={false}
                    defaultValue={value}
                    value={value}
                    max={max}
                    onChange={v => {
                      setValue(v)
                      loop()
                    }}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </VStack>
              )
            })}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
})

export default UI
