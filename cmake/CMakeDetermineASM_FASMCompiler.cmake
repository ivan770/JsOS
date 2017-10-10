set(ASM_DIALECT "_FASM")
include(CMakeDetermineASMCompiler)
set(CMAKE_ASM${ASM_DIALECT}_COMPILER_LIST fasm)
set(ASM_DIALECT)
