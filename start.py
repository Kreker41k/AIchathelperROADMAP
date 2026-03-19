import subprocess
import os
import sys
import time
import signal

def run_frontend():
    """Запускает React фронтенд"""
    frontend_dir = os.path.join(os.path.dirname(__file__), 'frontend')
    
    # Проверяем, установлены ли зависимости
    if not os.path.exists(os.path.join(frontend_dir, 'node_modules')):
        print("Устанавливаем зависимости фронтенда...")
        subprocess.run(['npm', 'install'], cwd=frontend_dir)
    
    # Запускаем React сервер
    return subprocess.Popen(
        ['npm', 'run', 'dev'],
        cwd=frontend_dir,
        shell=True
    )

def run_backend():
    """Запускает Python бэкенд"""
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    
    # Проверяем, установлены ли Python зависимости
    try:
        import flask
    except ImportError:
        print("Устанавливаем зависимости бэкенда...")
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'], cwd=backend_dir)
    
    # Запускаем Flask сервер
    return subprocess.Popen(
        [sys.executable, 'app.py'],
        cwd=backend_dir
    )

def main():
    print("="*50)
    print("Запуск приложения...")
    print("="*50)
    
    # Запускаем бэкенд
    print("\n1. Запуск бэкенда (Flask)...")
    backend_process = run_backend()
    time.sleep(2)  # Даем время Flask запуститься
    
    # Запускаем фронтенд
    print("\n2. Запуск фронтенда (React)...")
    frontend_process = run_frontend()
    
    print("\n" + "="*50)
    print("Приложение запущено!")
    print("Фронтенд: http://localhost:5173")
    print("Бэкенд API: http://localhost:5000")
    print("="*50)
    print("\nНажмите Ctrl+C для остановки...\n")
    
    try:
        # Ждем завершения процессов
        frontend_process.wait()
        backend_process.wait()
    except KeyboardInterrupt:
        print("\n\nОстанавливаем приложение...")
        
        # Завершаем процессы
        frontend_process.terminate()
        backend_process.terminate()
        
        # Ждем завершения
        frontend_process.wait()
        backend_process.wait()
        
        print("Приложение остановлено")
        sys.exit(0)

if __name__ == "__main__":
    main()