cmake_minimum_required(VERSION 3.0)

#if(NOT DEFINED CMAKE_BUILD_TYPE)
#    set(CMAKE_BUILD_TYPE "debug")
#endif()

#message(Build: ${CMAKE_BUILD_TYPE})


    # "name_gxx": "x86_64-elf-g++",
    # "name_gcc": "x86_64-elf-gcc",
    # "name_as": "x86_64-elf-as",
    # "name_ld": "x86_64-elf-gcc",
    # "name_ar": "x86_64-elf-ar",
    # "name_ranlib": "x86_64-elf-ranlib",
    # "name_objcopy": "x86_64-elf-objcopy",

set(CMAKE_SYSTEM_NAME Generic)
set(CMAKE_SYSTEM Generic)

set(CMAKE_SHARED_LIBRARY_LINK_C_FLAGS "")
set(CMAKE_SHARED_LIBRARY_LINK_CXX_FLAGS "")

find_program(CXX_COMPILER x86_64-elf-g++)
find_program(C_COMPILER x86_64-elf-gcc)
find_program(AR x86_64-elf-gcc-ar)
find_program(RANLIB x86_64-elf-gcc-ranlib)
find_program(OBJCOPY x86_64-elf-objcopy)

set(CMAKE_CXX_COMPILER ${CXX_COMPILER})
set(CMAKE_C_COMPILER ${C_COMPILER})
set(CMAKE_AR ${AR}})
set(CMAKE_RANLIB ${RANLIB})
set(CMAKE_OBJCOPY ${OBJCOPY}) # FIXME: ёбаный костыль

set(CMAKE_MODULE_PATH ${CMAKE_ROOT}/Modules ${CMAKE_SOURCE_DIR}/cmake)

enable_language(ASM_FASM)

enable_language(ASM_GCC)

set(COMMON_FLAGS " -m64 -ffreestanding -nostdlib -mno-red-zone -mno-mmx -mno-sse3 -mno-3dnow -nodefaultlibs -nostartfiles -Wall -Wextra -Wno-unused -fno-exceptions -Wno-unused-parameter -fdiagnostics-color -D__runtime_js__ -DRUNTIMEJS_PLATFORM_X64 ")
set(CXX_FLAGS " -nostdinc++ -std=c++11 -O3 -U__STRICT_ANSI__ -DENABLE_DEBUGGER_SUPPORT -DENABLE_DISASSEMBLER -DV8_HOST_ARCH_X64 -DV8_TARGET_ARCH_X64")

set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} ${COMMON_FLAGS} -O2 -c -std=c99 -D_XOPEN_SOURCE=700 -DSODIUM_STATIC")

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${COMMON_FLAGS} ${CXX_FLAGS}")

set(CMAKE_EXE_LINKER_FLAGS " -mno-red-zone -nostdlib -nodefaultlibs -T ${CMAKE_SOURCE_DIR}/etc/kernel.ld")

add_custom_target(
    genversion
    COMMAND node ${CMAKE_SOURCE_DIR}/scripts/update-versions.js
)

add_subdirectory(deps)

add_executable(kernel
                src/startup.cc
                src/icxxabi.cc
                src/libc_calls.cc
                src/ap_startup.asm
                src/main.cc
                src/kernel/thread.cc
                src/kernel/fileio.cc
                src/kernel/mem-manager.cc
                src/kernel/multiboot.cc
                src/kernel/native-object.cc
                src/kernel/logger.cc
                src/kernel/heap-snapshot.cc
                src/kernel/irq-dispatcher.cc
                src/kernel/crc32.cc
                src/kernel/engine.cc
                src/kernel/template-cache.cc
                src/kernel/trace.cc
                src/kernel/acpica-platform.cc
                src/kernel/profiler/profiler.cc
                src/kernel/thread-manager.cc
                src/kernel/transport.cc
                src/kernel/resource.cc
                src/kernel/kernel-main.cc
                src/kernel/irqs.cc
                src/kernel/runtime-state.cc
                src/kernel/dlmalloc.cc
                src/kernel/acpi-manager.cc
                src/kernel/platform.cc
                src/kernel/initrd.cc
                src/kernel/engines.cc
                src/kernel/v8platform.cc
                src/kernel/native-thread.cc
                src/kernel/v8sampler.cc
                src/kernel/x64/local-apic-x64.cc
                src/kernel/x64/platform-x64.cc
                src/kernel/x64/irqs-x64.cc
                src/kernel/x64/address-space-x64.cc
                src/kernel/x64/cpu-trampoline-x64.cc
                src/kernel/x64/irq-vectors-x64.asm
                src/kernel/x64/cpu-x64.cc
                src/kernel/x64/hpet-x64.cc
                src/kernel/x64/acpi-x64.cc
                src/kernel/x64/ioapic-x64.cc
                src/kernel/v8utils.cc
                src/startup.asm
)

target_include_directories(kernel PRIVATE
                deps/musl/src/internal
                deps/musl/include
                deps/musl/arch/x86_64
                deps/musl/arch/x86_64/bits
                deps/libcxx/include
                deps/v8/include
                deps/v8
                deps/concurrentqueue
                deps/acpica/source/include
                deps/printf
                deps/miniz
                deps/libsodium/src/libsodium/include
                deps/json11
                src
                test)

target_link_libraries(kernel
                v8
                cxxrt
                cxx
                miniz
                acpica
                printf
                sodium
                json11
                musl
                gcc)

add_dependencies(kernel genversion)

add_custom_command(TARGET kernel POST_BUILD COMMAND ${CMAKE_OBJCOPY} -O binary --strip-all --set-section-flags '.bss'=alloc,load,contents,data $<TARGET_FILE:kernel> ${CMAKE_BINARY_DIR}/runtime.img)

#set(CMAKE_ASM_FASM_COMPILER fasm)
#enable_language(ASM_FASM)